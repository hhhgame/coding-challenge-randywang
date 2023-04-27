import React, { useState, useEffect } from 'react';
import Assets from '../components/assets-list';
import StoreProvider from '../store/context';

export default function Index() {
  return (
    <StoreProvider>
      <Assets />
    </StoreProvider>
  );
}
