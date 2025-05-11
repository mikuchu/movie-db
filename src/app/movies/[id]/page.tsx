"use server";
import React from 'react';
import MovieDetail from './MovieDetail';
export default async function MoviePage({ params, }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
        <>
            <h1 style={{ flex: "flex", textAlign: "center", padding: "2rem" }}> Movie Details</h1 >
            <MovieDetail id={id} />
        </>
    );
}