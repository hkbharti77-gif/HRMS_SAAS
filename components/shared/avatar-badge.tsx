'use client';

import * as React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { avatarColor, initials } from '@/lib/format';

interface AvatarBadgeProps {
  name: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-base',
};

export function AvatarBadge({ name, src, size = 'md', className }: AvatarBadgeProps) {
  return (
    <Avatar className={cn(sizes[size], className)}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={name} className="h-full w-full object-cover" />
      ) : (
        <AvatarFallback
          className={cn('font-medium text-white', avatarColor(name))}
        >
          {initials(name)}
        </AvatarFallback>
      )}
    </Avatar>
  );
}
