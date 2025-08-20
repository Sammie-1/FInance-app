# Figma Assets Documentation

This directory contains all assets downloaded from the Figma Dashboard design. Assets are organized and accessible through the centralized `figma-assets.js` file.

## 📁 Asset Organization

### 🎯 KPI Icons (`kpiIcons`)

- **totalBalance**: Total Balance card icon (wallet icon with dollar sign)
- **totalSpending**: Total Spending card icon
- **totalSaved**: Total Saved card icon

### 👥 User Avatars (`userAvatars`)

- **salehAhmed**: Saleh Ahmed's profile picture
- **delowarHossain**: Delowar Hossain's profile picture
- **moinulHasan**: Moinul Hasan Nayem's profile picture
- **drJubedAhmed**: Dr. Jubed Ahmed's profile picture
- **arJakirAlp**: AR. Jakir Alp's profile picture
- **profile**: Main header profile avatar (Mahfuzul Nabil)

### 💼 Transaction Icons (`transactionIcons`)

- **iphone**: iPhone 13 Pro MAX icon (Apple transaction)
- **netflix**: Netflix subscription icon
- **figma**: Figma subscription icon

### 🎨 UI Icons (`uiIcons`)

- **magloLogo**: Maglo company logo (sidebar)
- **search**: Search icon (header)
- **notification**: Notification bell icon (header)
- **dropdown**: Dropdown arrow icon
- **expandMore**: Expand/collapse arrow icon

## 🔧 Usage Examples

```javascript
// Import organized collections
import { transactionIcons, userAvatars, kpiIcons, uiIcons } from '../assets/figma-assets'

// Use in components
<img src={transactionIcons.iphone} alt="iPhone" />
<img src={userAvatars.salehAhmed} alt="Saleh Ahmed" />
<img src={kpiIcons.totalBalance} alt="Total Balance" />
<img src={uiIcons.magloLogo} alt="Maglo Logo" />
```

## 📊 Asset Statistics

- **Total PNG Images**: 12 files (user avatars + transaction icons)
- **Total SVG Icons**: 5 files (UI elements)
- **Total Size**: ~400KB (optimized for web)
- **Format**: Optimized for Vite build system

## 🎨 Design System Integration

All assets follow the Figma design system:

- **Consistent sizing**: Icons sized appropriately for their context
- **Theme compatibility**: Assets work in both light and dark themes
- **Responsive design**: Assets scale properly across different screen sizes
- **Accessibility**: All assets include proper alt text descriptions

## 📂 File Mapping

| Asset Name          | Original Figma Hash | Type | Usage                |
| ------------------- | ------------------- | ---- | -------------------- |
| iPhone Icon         | e8f2f2325479...     | PNG  | Transaction list     |
| Netflix Icon        | 0a07ef549ecd...     | PNG  | Transaction list     |
| Figma Icon          | d9d7d4b3c515...     | PNG  | Transaction list     |
| Saleh Avatar        | ae42a90e9776...     | PNG  | Scheduled transfers  |
| Delowar Avatar      | 9d4b98bc2a8c...     | PNG  | Scheduled transfers  |
| Moinul Avatar       | e20e7c0b7a97...     | PNG  | Scheduled transfers  |
| Dr. Jubed Avatar    | 2318919120a0...     | PNG  | Scheduled transfers  |
| AR. Jakir Avatar    | 4dddccf21648...     | PNG  | Scheduled transfers  |
| Profile Avatar      | bce2c78db5cf...     | PNG  | Header profile       |
| Total Balance Icon  | 6bffe6399f0e...     | SVG  | KPI card             |
| Total Spending Icon | 80185a6c24ef...     | SVG  | KPI card             |
| Total Saved Icon    | 15f25a1ccc5d...     | SVG  | KPI card             |
| Expand More Icon    | dd64a06c0088...     | SVG  | UI elements          |
| Maglo Logo          | 543451cbbe7a...     | SVG  | Sidebar logo         |
| Search Icon         | 82a4510e97cf...     | SVG  | Header search        |
| Notification Icon   | 5881a2a5cf37...     | SVG  | Header notifications |
| Dropdown Icon       | 836669b9eb42...     | SVG  | UI dropdowns         |

## 🚀 Build Integration

Assets are automatically processed by Vite:

- **Optimization**: Images compressed and optimized
- **Caching**: Proper cache headers for production
- **Tree Shaking**: Unused assets excluded from bundle
- **Module Loading**: Efficient loading with proper imports

## ✅ Benefits

1. **Centralized Management**: All assets in one organized location
2. **Type Safety**: Consistent import patterns
3. **Performance**: Optimized loading and caching
4. **Maintainability**: Easy to update or replace assets
5. **Developer Experience**: Clear naming and organization
6. **Build Optimization**: Automatic compression and optimization
