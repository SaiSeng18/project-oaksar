'use client';

import { signOut } from 'next-auth/react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const UserAvatar = ({
    user,
}: {
    user:
        | {
              name?: string | null;
              email?: string | null;
              image?: string | null;
          }
        | undefined;
}) => {
    const name = user?.name
        ?.split(' ')
        .slice(0, 2)
        .map((n, i, arr) => (arr.length === 1 ? n[0] : n[0]))
        .join('')
        .toUpperCase();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='w-fit focus-within:outline-none'>
                <Avatar>
                    <AvatarImage src={user?.image as string} />
                    <AvatarFallback>{name}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>
                    <button
                        onClick={() => {
                            signOut();
                        }}>
                        Sign Out
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserAvatar;
