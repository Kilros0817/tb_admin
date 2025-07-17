'use client';

import SwitchTheme from './base/SwitchTheme';
import SignOut from './base/SignOut';

export default function Header() {
  return (
    <div className="flex items-center space-x-3">
      <SwitchTheme/>
      <SignOut/>
    </div>
  );
}