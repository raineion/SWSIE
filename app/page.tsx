"use client"

import React from 'react';
import HomePage from './components/HomePage';
import Layout from './components/Layout';
import PageTransition from './components/PageTransition';

export default function Page() {
  return (
    <Layout>
      <PageTransition>
        <HomePage />
      </PageTransition>
    </Layout>
  )
}
