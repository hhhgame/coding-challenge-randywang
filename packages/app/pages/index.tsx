import React, { useState, useEffect } from 'react';
import StoreProvider from '../store/context';
import Pools from '../components/pools-list';

export default function Index() {
  return (
    <>
      <StoreProvider>
        <Pools />
      </StoreProvider>
    </>
  );
}
