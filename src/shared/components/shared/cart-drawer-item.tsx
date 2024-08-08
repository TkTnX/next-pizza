import * as React from 'react';
import * as CartItem from "./cart-item-details"
import { CartItemProps } from './cart-item-details/cart-item-details.types';
import { CountButton } from './count-button';
import { Trash2Icon } from 'lucide-react';
interface ICartDrawerItemProps extends CartItemProps {
  
}

const CartDrawerItem: React.FunctionComponent<ICartDrawerItemProps> = ({
  id, imageUrl, name, price, quantity, details
}) => {
    return (
      <div className="flex bg-white p-5 gap-6">
        <CartItem.Image src={imageUrl} />

        <div className="flex-1">
          <CartItem.Info details={details} name={name} />

          <hr className='my-3' />

          <div className='flex items-center justify-between'>
            <CountButton onClick={type => console.log(type)} value={quantity} />
            
            <div className='flex items-center gap-3'>
              <CartItem.Price value={price} />
              <Trash2Icon className='text-gray-400 cursor-pointer hover:text-gray-600' size={16} />
            </div>
          </div>
        </div>
      </div>
    );
};

export default CartDrawerItem;
