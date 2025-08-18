// Figma assets for navigation icons
import settingsLocalIcon from '../assets/icons/settings.svg';
const img = "http://localhost:3845/assets/18a8d1835cb9b2c91eef632e090931e96adbc134.svg";
const img1 = "http://localhost:3845/assets/ec33677e0778073cb1c54cc509cd1523b3587e30.svg";
const img2 = "http://localhost:3845/assets/92008d11711393949765aa06fb274c0fb13b9367.svg";
const img3 = "http://localhost:3845/assets/25a74f47851e782b4595be981a7e935fcce1e508.svg";
const img4 = "http://localhost:3845/assets/465c6392976767b3e63731e564457450d19ef7e7.svg";

// Additional navigation icons
const helpIcon = "http://localhost:3845/assets/19415af5312ac6bf8d76f65a4f4eda8ccf703ac7.svg";
const logoutIcon = "http://localhost:3845/assets/579f7affe2637b22d7d50cc4cd319f2a298c16ef.svg";

// Shared navigation configuration
export const navigationConfig = {
  topSidebarItems: [
    { icon: img, label: 'Dashboard', active: false, path: '/dashboard' },
    { icon: img1, label: 'Transactions', active: false, path: '/transactions' },
    { icon: img2, label: 'Invoices', active: false, path: '/invoices' },
    { icon: img4, label: 'My Wallets', active: false, path: '/my-wallets' },
    { icon: settingsLocalIcon, label: 'Settings', active: false, path: '/settings' }
  ],
  
  bottomSidebarItems: [
    { icon: helpIcon, label: 'Help', active: false },
    { icon: logoutIcon, label: 'Logout', active: false }
  ]
};

// Helper function to set active state based on current path
export const getNavigationWithActiveState = (currentPath) => {
  return {
    topSidebarItems: navigationConfig.topSidebarItems.map(item => ({
      ...item,
      active: item.path === currentPath
    })),
    bottomSidebarItems: navigationConfig.bottomSidebarItems
  };
};
