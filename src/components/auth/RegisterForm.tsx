import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, CheckCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Button, Input, Alert } from '../ui';

const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const { register: registerUser, isLoading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      clearError();
      await registerUser(data.email, data.password);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch {
      // Error is handled by the store
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            ¡Registro exitoso!
          </h2>
          <p className="text-gray-600">
            Tu cuenta ha sido creada. Redirigiendo al inicio de sesión...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Crear Cuenta
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

          <div className="relative">
            <Lock className="absolute left-3 top-9 w-5 h-5 text-gray-400" />
            <Input
              label="Confirmar Contraseña"
              type="password"
              placeholder="••••••••"
              className="pl-10"
              error={errors.confirmPassword?.message}
              {...register('confirmPassword')}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
          >
            Crear Cuenta
          </Button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="text-primary-600 hover:underline font-medium">
            Inicia Sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
