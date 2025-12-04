import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, CheckCircle, User, Phone, MapPin, Calendar } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Button, Input, Alert } from '../ui';

const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres'),
  confirmPassword: z.string(),
  firstName: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  lastName: z.string().min(2, 'El apellido debe tener al menos 2 caracteres'),
  phone: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  birthDate: z.string().optional(),
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
      await registerUser({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone || undefined,
        country: data.country || undefined,
        city: data.city || undefined,
        birthDate: data.birthDate || undefined,
      });
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
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <User className="absolute left-3 top-9 w-5 h-5 text-gray-400" />
              <Input
                label="Nombre"
                type="text"
                placeholder="Juan"
                className="pl-10"
                error={errors.firstName?.message}
                {...register('firstName')}
              />
            </div>
            <div className="relative">
              <User className="absolute left-3 top-9 w-5 h-5 text-gray-400" />
              <Input
                label="Apellido"
                type="text"
                placeholder="Pérez"
                className="pl-10"
                error={errors.lastName?.message}
                {...register('lastName')}
              />
            </div>
          </div>

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

          {/* Optional Fields */}
          <div className="border-t border-gray-200 pt-4 mt-4">
            <p className="text-sm text-gray-500 mb-3">Información adicional (opcional)</p>
            
            <div className="relative mb-4">
              <Phone className="absolute left-3 top-9 w-5 h-5 text-gray-400" />
              <Input
                label="Teléfono"
                type="tel"
                placeholder="+51 999 888 777"
                className="pl-10"
                error={errors.phone?.message}
                {...register('phone')}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-9 w-5 h-5 text-gray-400" />
                <Input
                  label="País"
                  type="text"
                  placeholder="Perú"
                  className="pl-10"
                  error={errors.country?.message}
                  {...register('country')}
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-9 w-5 h-5 text-gray-400" />
                <Input
                  label="Ciudad"
                  type="text"
                  placeholder="Lima"
                  className="pl-10"
                  error={errors.city?.message}
                  {...register('city')}
                />
              </div>
            </div>

            <div className="relative">
              <Calendar className="absolute left-3 top-9 w-5 h-5 text-gray-400" />
              <Input
                label="Fecha de Nacimiento"
                type="date"
                className="pl-10"
                error={errors.birthDate?.message}
                {...register('birthDate')}
              />
            </div>
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
