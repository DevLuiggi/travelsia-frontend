import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Button, Input, Alert } from '../ui';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'La contraseña es requerida'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { login, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      clearError();
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch {
      // Error is handled by the store
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Iniciar Sesión
        </h2>

        {error && (
          <Alert type="error" className="mb-4">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-9 w-5 h-5 text-gray-400" />
            <Input
              label="Email"
              type="email"
              placeholder="tu@email.com"
              className="pl-10"
              error={errors.email?.message}
              {...register('email')}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-9 w-5 h-5 text-gray-400" />
            <Input
              label="Contraseña"
              type="password"
              placeholder="••••••••"
              className="pl-10"
              error={errors.password?.message}
              {...register('password')}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
          >
            Iniciar Sesión
          </Button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="text-primary-600 hover:underline font-medium">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}
