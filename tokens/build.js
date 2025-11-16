import StyleDictionary from 'style-dictionary'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Convert W3C format ($type, $value) to Style Dictionary format (type, value)
function convertW3CFormat(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map(convertW3CFormat)
  }

  const converted = {}
  for (const [key, value] of Object.entries(obj)) {
    if (key === '$type') {
      converted.type = value
    } else if (key === '$value') {
      converted.value = value
    } else if (key === '$extensions') {
      converted.$extensions = value
    } else {
      converted[key] = convertW3CFormat(value)
    }
  }
  return converted
}

// Load and convert token files
function loadTokens(filePath) {
  if (!fs.existsSync(filePath)) {
    return {}
  }
  const content = fs.readFileSync(filePath, 'utf-8')
  const json = JSON.parse(content)
  return convertW3CFormat(json)
}

// Merge token objects
function mergeTokens(...tokens) {
  return tokens.reduce((acc, token) => {
    return deepMerge(acc, token)
  }, {})
}

function deepMerge(target, source) {
  const output = { ...target }
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      output[key] = deepMerge(target[key] || {}, source[key])
    } else {
      output[key] = source[key]
    }
  }
  return output
}

// Convert token reference to CSS variable name with pa- prefix
function refToCSSVar(ref) {
  const cleanRef = ref.replace(/[{}]/g, '')
  return '--pa-' + cleanRef.split('.').join('-')
}

// Resolve a reference value by looking it up in the token tree
function resolveReference(ref, tokens) {
  const cleanRef = ref.replace(/[{}]/g, '')
  const parts = cleanRef.split('.')
  let current = tokens
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part]
    } else {
      return null
    }
  }
  // Handle both W3C format ($value) and converted format (value)
  if (current && typeof current === 'object') {
    if ('value' in current) {
      return current.value
    } else if ('$value' in current) {
      return current.$value
    }
  }
  return null
}

// Manually generate CSS from token objects (fallback when StyleDictionary fails)
function generateCSSFromTokens(tokens, selector, tier1Tokens) {
  const output = []
  output.push('/**')
  output.push(' * Do not edit directly')
  output.push(` * Generated on ${new Date().toUTCString()}`)
  output.push(' */')
  output.push('')
  output.push(`${selector} {`)
  
  function traverse(obj, path = []) {
    for (const [key, value] of Object.entries(obj)) {
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        // Check for token in both W3C format ($type, $value) and converted format (type, value)
        const isToken = ('$type' in value && '$value' in value) || ('type' in value && 'value' in value)
        
        if (isToken) {
          // This is a token
          const tokenPath = [...path, key]
          const varName = '--pa-' + tokenPath.join('-')
          // Get value from either format
          let tokenValue = value.$value !== undefined ? value.$value : value.value
          
          // Check if it's a reference
          if (typeof tokenValue === 'string' && tokenValue.startsWith('{') && tokenValue.endsWith('}')) {
            // Try to resolve the reference
            const resolved = resolveReference(tokenValue, tier1Tokens)
            if (resolved !== null) {
              tokenValue = resolved
            } else {
              // Use CSS variable reference
              tokenValue = `var(${refToCSSVar(tokenValue)})`
            }
          }
          
          output.push(`  ${varName}: ${tokenValue};`)
        } else {
          // Continue traversing
          traverse(value, [...path, key])
        }
      }
    }
  }
  
  traverse(tokens)
  output.push('}')
  return output.join('\n')
}

// Custom format that preserves references as CSS variables with pa- prefix
StyleDictionary.registerFormat({
  name: 'css/variables-tiered',
  format: function({ dictionary, options }) {
    const selector = options.selector || ':root'
    let output = `/**\n * Do not edit directly\n * Generated on ${new Date().toUTCString()}\n */\n\n${selector} {\n`
    
    dictionary.allTokens.forEach(token => {
      const name = token.path.join('-')
      let value = token.value
      
      // Check if original value was a reference
      if (token.original && token.original.value && 
          typeof token.original.value === 'string' && 
          token.original.value.startsWith('{') && 
          token.original.value.endsWith('}')) {
        value = `var(${refToCSSVar(token.original.value)})`
      }
      
      output += `  --pa-${name}: ${value};\n`
    })
    
    output += '}\n'
    return output
  }
})

// Custom format for Tier 1 tokens with pa- prefix
StyleDictionary.registerFormat({
  name: 'css/variables-pa',
  format: function({ dictionary, options }) {
    const selector = options.selector || ':root'
    let output = `/**\n * Do not edit directly\n * Generated on ${new Date().toUTCString()}\n */\n\n${selector} {\n`
    
    dictionary.allTokens.forEach(token => {
      const name = token.path.join('-')
      output += `  --pa-${name}: ${token.value};\n`
    })
    
    output += '}\n'
    return output
  }
})

// Load all token files
const coreTokens = loadTokens(path.join(__dirname, 'tier1-core/core.json'))
const brandPayAdvantage = loadTokens(path.join(__dirname, 'tier1-core/brand-pay-advantage.json'))
const brandMarshalFreeman = loadTokens(path.join(__dirname, 'tier1-core/brand-marshal-freeman.json'))

const semanticLight = loadTokens(path.join(__dirname, 'tier2-semantic/pay-advantage-light.json'))
const semanticDark = loadTokens(path.join(__dirname, 'tier2-semantic/pay-advantage-dark.json'))
const semanticTypography = loadTokens(path.join(__dirname, 'tier2-semantic/typography.json'))
const semanticFoundation = loadTokens(path.join(__dirname, 'tier2-semantic/foundation.json'))

// Load all component tokens
const componentTokenFiles = fs.readdirSync(path.join(__dirname, 'tier3-component'))
  .filter(file => file.endsWith('.json'))
  .map(file => loadTokens(path.join(__dirname, 'tier3-component', file)))

const componentTokens = mergeTokens(...componentTokenFiles)

// Merge tier1 tokens (core + brands)
const tier1Tokens = mergeTokens(coreTokens, brandPayAdvantage, brandMarshalFreeman)

async function buildTokens() {
  try {
    // Build Tier 1 (base tokens) - outputs raw values with pa- prefix
    const tier1Config = {
      tokens: tier1Tokens,
      platforms: {
        css: {
          transformGroup: 'css',
          buildPath: __dirname + '/',
          files: [
            {
              destination: 'tier1.css',
              format: 'css/variables-pa',
              options: {
                selector: ':root'
              }
            }
          ]
        }
      }
    }
    
    const tier1SD = new StyleDictionary(tier1Config)
    await tier1SD.buildAllPlatforms()
    
    // Build Tier 2 + Tier 3 (semantic + component tokens) - references Tier 1
    // For light theme
    const tier2LightTokens = mergeTokens(semanticLight, semanticTypography, semanticFoundation)
    const lightTier23Tokens = mergeTokens(tier2LightTokens, componentTokens)
    
    // Include Tier 1 tokens so references can be resolved, but we'll filter them out
    const lightAllTokens = mergeTokens(tier1Tokens, lightTier23Tokens)
    
    const lightConfig = {
      tokens: lightAllTokens,
      platforms: {
        css: {
          transformGroup: 'css',
          buildPath: __dirname + '/',
          files: [
            {
              destination: 'tier23-light.css',
              format: 'css/variables-tiered',
              options: {
                selector: ':root'
              }
            }
          ]
        }
      }
    }
    
    // For dark theme
    const tier2DarkTokens = mergeTokens(semanticDark, semanticTypography, semanticFoundation)
    const darkTier23Tokens = mergeTokens(tier2DarkTokens, componentTokens)
    const darkAllTokens = mergeTokens(tier1Tokens, darkTier23Tokens)
    
    const darkConfig = {
      tokens: darkAllTokens,
      platforms: {
        css: {
          transformGroup: 'css',
          buildPath: __dirname + '/',
          files: [
            {
              destination: 'tier23-dark.css',
              format: 'css/variables-tiered',
              options: {
                selector: '[data-theme="dark"]'
              }
            }
          ]
        }
      }
    }

    const lightPath = path.join(__dirname, 'tier23-light.css')
    const darkPath = path.join(__dirname, 'tier23-dark.css')
    
    let lightBuildSuccess = false
    let darkBuildSuccess = false
    
    // Build light theme
    try {
      const lightSD = new StyleDictionary({
        ...lightConfig,
        log: { verbosity: 'error' }
      })
      await lightSD.buildAllPlatforms()
      lightBuildSuccess = true
    } catch (error) {
      if (error.message && (error.message.includes('Reference Errors') || error.message.includes('reference'))) {
        console.warn('⚠️  Some token references could not be resolved for light theme, continuing anyway...')
      } else {
        console.warn('⚠️  Light theme build failed:', error.message)
      }
    }
    
    // Build dark theme
    try {
      const darkSD = new StyleDictionary({
        ...darkConfig,
        log: { verbosity: 'error' }
      })
      await darkSD.buildAllPlatforms()
      darkBuildSuccess = true
    } catch (error) {
      if (error.message && (error.message.includes('Reference Errors') || error.message.includes('reference'))) {
        console.warn('⚠️  Some token references could not be resolved for dark theme, continuing anyway...')
      } else {
        console.warn('⚠️  Dark theme build failed:', error.message)
      }
    }
    
    // If builds failed, manually generate CSS from tokens
    if (!lightBuildSuccess && !fs.existsSync(lightPath)) {
      console.warn('⚠️  StyleDictionary failed for light theme, generating CSS manually...')
      const manualLightCSS = generateCSSFromTokens(lightTier23Tokens, ':root', tier1Tokens)
      fs.writeFileSync(lightPath, manualLightCSS)
      lightBuildSuccess = true
    }
    
    if (!darkBuildSuccess && !fs.existsSync(darkPath)) {
      console.warn('⚠️  StyleDictionary failed for dark theme, generating CSS manually...')
      const manualDarkCSS = generateCSSFromTokens(darkTier23Tokens, '[data-theme="dark"]', tier1Tokens)
      fs.writeFileSync(darkPath, manualDarkCSS)
      darkBuildSuccess = true
    }

  // Read Tier 1 CSS (base values)
  const tier1Path = path.join(__dirname, 'tier1.css')
  
  if (!fs.existsSync(tier1Path)) {
    throw new Error('tier1.css was not generated')
  }
  
  const tier1CSS = fs.readFileSync(tier1Path, 'utf-8')
  
  // Read Tier 2/3 CSS and filter out Tier 1 tokens
  let lightCSS = ''
  let darkCSS = ''
  
  if (fs.existsSync(lightPath)) {
    lightCSS = fs.readFileSync(lightPath, 'utf-8')
  } else {
    console.warn('⚠️  tier23-light.css was not generated, using empty CSS')
  }
  
  if (fs.existsSync(darkPath)) {
    darkCSS = fs.readFileSync(darkPath, 'utf-8')
  } else {
    console.warn('⚠️  tier23-dark.css was not generated, using empty CSS')
  }
  
  // Extract CSS variable declarations and filter
  function filterTier23CSS(css) {
    const lines = css.split('\n')
    const filtered = []
    let inRootBlock = false
    
    for (const line of lines) {
      if (line.includes(':root') || line.includes('[data-theme')) {
        inRootBlock = true
        filtered.push(line)
        continue
      }
      if (line.includes('}')) {
        inRootBlock = false
        filtered.push(line)
        continue
      }
      
      if (inRootBlock && line.trim().startsWith('--pa-')) {
        // Extract the variable name (everything before the colon)
        const varNameMatch = line.match(/^[\s]*--pa-([^:]+):/)
        if (varNameMatch) {
          const varName = varNameMatch[1]
          // Check if this is a Tier 1 token
          // Tier 2 semantic foundation tokens: border-width-thin/medium/thick, border-radius-small/medium/large/full, spacing-50/100/150/200/250/300/400/450/500/600/700 (number-based for >5 sizes), font-size-xs/sm/md/lg/xl (t-shirt for ≤5 sizes), icon-size-sm/md/lg/xl/2xl (t-shirt for ≤5 sizes)
          // Tier 1 tokens: gray-*, blue-*, spacing-0/4/8/10/12/16/etc (numeric), font-size-50/75/100/etc (numeric), icon-size-100/200/etc (numeric), border-radius-50/100/etc (numeric), border-width-50/100/etc (numeric), Border-*, brand-*, layout-*
          const tier2SemanticPatterns = ['border-width-thin', 'border-width-medium', 'border-width-thick', 'border-radius-small', 'border-radius-medium', 'border-radius-large', 'border-radius-full', 'spacing-25', 'spacing-50', 'spacing-100', 'spacing-150', 'spacing-200', 'spacing-250', 'spacing-300', 'spacing-400', 'spacing-450', 'spacing-500', 'spacing-600', 'spacing-700', 'font-size-xs', 'font-size-sm', 'font-size-md', 'font-size-lg', 'font-size-xl', 'icon-size-sm', 'icon-size-xs', 'icon-size-md', 'icon-size-lg', 'icon-size-xl', 'icon-size-2xl']
          const isTier2Semantic = tier2SemanticPatterns.some(pattern => varName === pattern || varName.startsWith(pattern + '-'))
          
          // Tier 1 prefixes (exact numeric matches)
          const tier1Prefixes = ['gray-', 'blue-', 'green-', 'yellow-', 'red-', 'spacing-0', 'spacing-00', 'spacing-2', 'spacing-4', 'spacing-8', 'spacing-10', 'spacing-12', 'spacing-16', 'spacing-18', 'spacing-24', 'spacing-32', 'spacing-36', 'spacing-48', 'spacing-56', 'spacing-64', 'font-size-50', 'font-size-75', 'font-size-100', 'font-size-200', 'font-size-250', 'font-size-400', 'font-size-500', 'font-size-600', 'font-size-700', 'font-size-800', 'font-size-900', 'text-', 'line-', 'letter-', 'icon-size-100', 'icon-size-200', 'icon-size-300', 'icon-size-400', 'icon-size-500', 'border-radius-50', 'border-radius-100', 'border-radius-150', 'border-radius-200', 'border-radius-250', 'border-radius-300', 'border-radius-none', 'border-radius-full', 'border-width-0', 'border-width-50', 'border-width-75', 'border-width-100', 'border-width-300', 'border-width-100-2', 'opacity-', 'shadow-sm-', 'shadow-md-', 'shadow-lg-', 'z-index-0', 'z-index-100', 'z-index-200', 'z-index-300', 'z-index-400', 'z-index-500', 'z-index-top', 'z-index-bottom', 'brand-', 'transition-', 'outline-', 'Border-', 'layout-']
          const isTier1 = tier1Prefixes.some(prefix => varName.startsWith(prefix)) && !isTier2Semantic
          
          // Include Tier 2/3 tokens, exclude Tier 1 tokens
          if (!isTier1) {
            filtered.push(line)
          }
        } else {
          // If we can't parse it, include it to be safe
          filtered.push(line)
        }
      } else {
        filtered.push(line)
      }
    }
    
    return filtered.join('\n')
  }
  
  lightCSS = filterTier23CSS(lightCSS)
  darkCSS = filterTier23CSS(darkCSS)
  
  // Combine: Tier 1 (base) + Tier 2/3 (semantic + component) for light theme
  // Then dark theme overrides
  const combinedCSS = tier1CSS + '\n\n' + lightCSS + '\n\n' + darkCSS
  
  fs.writeFileSync(path.join(__dirname, 'index.css'), combinedCSS)
  
  // Clean up temporary files if they exist
  if (fs.existsSync(lightPath)) {
    fs.unlinkSync(lightPath)
  }
  if (fs.existsSync(darkPath)) {
    fs.unlinkSync(darkPath)
  }
  if (fs.existsSync(tier1Path)) {
    fs.unlinkSync(tier1Path)
  }
  
    console.log('✅ Tokens compiled successfully!')
  } catch (error) {
    console.error('❌ Error building tokens:', error.message)
    console.error(error.stack)
    process.exit(1)
  }
}

buildTokens()
