import { useState, useEffect } from 'react';
import { Shield, Eye, LogOut } from 'lucide-react';
import { Button } from './Button';
import { useFinanceStore } from '../../store/useFinanceStore';

const ADMIN_PASSWORD = 'admin123'; // Hardcoded password for demo

export function RoleSwitcher() {
  const role = useFinanceStore((s) => s.role);
  const setRole = useFinanceStore((s) => s.setRole);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!initialized) {
      const savedRole = sessionStorage.getItem('finance-dashboard-role') || 'viewer';
      setRole(savedRole);
      setInitialized(true);
    }
  }, [initialized, setRole]);

  const handleRoleChange = (newRole) => {
    if (newRole === 'admin') {
      const password = window.prompt('Enter admin password:');
      if (password === ADMIN_PASSWORD) {
        setRole('admin');
        sessionStorage.setItem('finance-dashboard-role', 'admin');
      } else {
        alert('Wrong password');
        // Revert to viewer if already admin
        if (role === 'admin') {
          setRole('viewer');
          sessionStorage.setItem('finance-dashboard-role', 'viewer');
        }
        return;
      }
    } else {
      setRole('viewer');
      sessionStorage.setItem('finance-dashboard-role', 'viewer');
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setRole('viewer');
    window.location.reload(); // Reset everything
  };

  const hasSession = sessionStorage.getItem('finance-dashboard-role') === 'admin';

  return (
    <div className="flex items-center gap-2">
      <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
        <span className="hidden sm:inline">Role</span>
        <div className="relative">
          <select
            value={role}
            onChange={(e) => handleRoleChange(e.target.value)}
            className={[
              'appearance-none rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-8 text-sm font-medium text-slate-800',
              'shadow-sm transition hover:border-slate-300 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30',
              'dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-slate-500',
            ].join(' ')}
            aria-label="Switch role"
          >
            <option value="viewer">Viewer (read-only)</option>
            <option value="admin">Admin (edit)</option>
          </select>
          <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500">
            {role === 'admin' ? <Shield className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </span>
        </div>
      </label>
      {role === 'admin' && hasSession && (
        <Button
          variant="ghost"
          className="!p-2"
          onClick={handleLogout}
          aria-label="Logout"
          title="Logout and reset"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
