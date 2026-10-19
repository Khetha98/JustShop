export const products = [
  {
    id: 'field-tote',
    name: 'Field Day Tote',
    detail: 'Heavy cotton canvas · Moss',
    price: 38,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Natural canvas tote bag with everyday essentials',
    color: 'moss',
  },
  {
    id: 'daily-notebook',
    name: 'The Daily Notebook',
    detail: 'Recycled paper · Soft cover',
    price: 18,
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=1000&q=85',
    imageAlt: 'Open notebook and pen beside a keyboard',
    color: 'oat',
  },
]

export function formatPrice(amount) {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    maximumFractionDigits: 0,
  }).format(amount)
}