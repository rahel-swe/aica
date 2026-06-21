import { forwardRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';

type PasswordInputProps = {
  value: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ value, onChange, disabled, placeholder = 'Password' }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative">
        <Input
          ref={ref} // 👈 THIS is the key
          type={showPassword ? 'text' : 'password'}
          value={value}
          disabled={disabled}
          onChange={onChange}
          placeholder={placeholder}
          className="pe-12 bg-background py-7 rounded-full"
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute inset-e-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          tabIndex={-1} // 👈 prevents stealing focus when tabbing
        >
          {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
