// Local navigation icons
import settingsLocalIcon from '../assets/icons/settings.svg';
import dashboardIcon from '../assets/icons/dashboard.svg';
import transactionsIcon from '../assets/icons/transactions.svg';
import invoicesIcon from '../assets/icons/invoices.svg';
import myWalletsIcon from '../assets/icons/My Wallets.svg';
import helpIcon from '../assets/icons/Help.svg';
import logoutIcon from '../assets/icons/lock.svg';

// Shared navigation configuration
export const navigationConfig = {
  topSidebarItems: [
    { icon: dashboardIcon, label: 'Dashboard', active: false, path: '/dashboard' },
    { icon: transactionsIcon, label: 'Transactions', active: false, path: '/transactions' },
    { icon: invoicesIcon, label: 'Invoices', active: false, path: '/invoices' },
    { icon: myWalletsIcon, label: 'My Wallets', active: false, path: '/my-wallets' },
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
