/**
 * Gera URL de imagem automaticamente baseado no nome e categoria do produto
 * Usa Unsplash Source API para buscar imagens relacionadas
 */
export function getGiftImage(name: string, category?: string): string {
  // Palavras-chave para buscar imagens baseado no nome do produto
  const keywords = extractKeywords(name, category)
  
  // Gera uma URL do Unsplash Source baseada nas palavras-chave
  const searchQuery = keywords.join('+')
  
  // Usa Unsplash Source API (gratuita, sem necessidade de API key)
  return `https://source.unsplash.com/800x600/?${searchQuery}`
}

function extractKeywords(name: string, category?: string): string[] {
  const nameLower = name.toLowerCase()
  const keywords: string[] = []
  
  // Adiciona categoria se disponível
  if (category) {
    const categoryMap: Record<string, string> = {
      'Cozinha': 'kitchen',
      'Casa': 'home',
      'Decoração': 'decoration'
    }
    keywords.push(categoryMap[category] || category.toLowerCase())
  }
  
  // Extrai palavras-chave do nome
  const productKeywords: Record<string, string> = {
    'purificador': 'water+filter',
    'água': 'water',
    'panela': 'pan',
    'panelas': 'cookware',
    'aspirador': 'vacuum',
    'ferro': 'iron',
    'frigideira': 'frying+pan',
    'tábua': 'cutting+board',
    'toalha': 'towel',
    'toalhas': 'towels',
    'pote': 'jar',
    'potes': 'jars',
    'tapete': 'rug',
    'tapetes': 'rugs',
    'prato': 'plate',
    'pratos': 'plates',
    'talher': 'cutlery',
    'talheres': 'cutlery',
    'sanduicheira': 'sandwich+maker',
    'grill': 'grill',
    'assadeira': 'baking+pan',
    'assadeiras': 'baking+pans',
    'travessa': 'serving+bowl',
    'travessas': 'serving+bowls',
    'cumbuca': 'bowl',
    'cumbucas': 'bowls',
    'pressão': 'pressure+cooker',
    'escorredor': 'drainer',
    'louças': 'dishes',
    'boleira': 'serving+bowl',
    'espelho': 'mirror',
    'lixeira': 'trash+can',
    'banheiro': 'bathroom',
    'liquidificador': 'blender',
    'mixer': 'mixer',
    'processador': 'food+processor',
    'tempero': 'spices',
    'temperos': 'spices',
    'corte': 'cutting+board',
    'pudim': 'pudding',
    'chaleira': 'kettle',
    'bolo': 'cake',
    'aparelho': 'dinnerware',
    'jantar': 'dinnerware',
    'utensílio': 'kitchen+utensil',
    'utensílios': 'kitchen+utensils',
    'varal': 'clothesline',
    'taça': 'glass',
    'taças': 'glasses',
    'cerveja': 'beer',
    'bomboniere': 'candy+jar',
    'prateleira': 'shelf',
    'prateleiras': 'shelves',
    'fruteira': 'fruit+bowl',
    'lençol': 'bed+sheet',
    'lençóis': 'bed+sheets',
    'cama': 'bed',
    'ventilador': 'fan',
    'mesinha': 'side+table',
    'mesinhas': 'side+tables',
    'lâmpada': 'lamp',
    'inteligente': 'smart'
  }
  
  // Busca palavras-chave no nome
  for (const [key, value] of Object.entries(productKeywords)) {
    if (nameLower.includes(key)) {
      keywords.push(value)
      break // Usa a primeira palavra-chave encontrada
    }
  }
  
  // Se não encontrou nenhuma palavra-chave, usa termos genéricos baseados na categoria
  if (keywords.length === 0) {
    if (category === 'Cozinha') {
      keywords.push('kitchen', 'cookware')
    } else if (category === 'Casa') {
      keywords.push('home', 'household')
    } else if (category === 'Decoração') {
      keywords.push('decoration', 'home+decor')
    } else {
      keywords.push('product', 'item')
    }
  }
  
  return keywords
}


