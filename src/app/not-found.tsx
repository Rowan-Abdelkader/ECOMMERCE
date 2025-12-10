
import React from 'react';
import Image from 'next/image';
import errorImg from './../screens/404.jpg'

const NotFoundPage = () => {
  return (
    <div className="text-center py-25">
      <Image alt='Not Found' src={errorImg} />
    </div>
  );
}

export default NotFoundPage;
