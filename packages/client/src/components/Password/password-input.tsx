import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';

type PasswordInputProps = {
  value: string;
  disabled: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export default function PasswordInput({
  value,
  onChange,
  disabled,
  placeholder = 'Password',
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? 'text' : 'password'}
        value={value}
        disabled={disabled}
        onChange={onChange}
        placeholder={placeholder}
        className="pe-12 text-sm"
      />

      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
      >
        {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
      </button>
    </div>
  );
}
