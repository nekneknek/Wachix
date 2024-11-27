import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Tag } from 'lucide-react';

interface CouponFormProps {
  onApply: (code: string) => Promise<void>;
}

const CouponForm: React.FC<CouponFormProps> = ({ onApply }) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: { code: string }) => {
    setLoading(true);
    try {
      await onApply(data.code);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            {...register('code', { required: 'Code requis' })}
            type="text"
            placeholder="Code promo"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-500"
          />
          <Tag className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 bg-gold-500 text-white rounded-lg hover:bg-gold-600 transition-colors
            ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Application...' : 'Appliquer'}
        </button>
      </div>
      {errors.code && (
        <p className="mt-1 text-sm text-red-500">{errors.code.message as string}</p>
      )}
    </form>
  );
};

export default CouponForm;