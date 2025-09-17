export function TypographyH1({ children }: { children: React.ReactNode }) {
    return <h1 className="scroll-m-20  text-4xl font-extrabold tracking-tight text-balance">{children}</h1>;
}

export function TypographyH2({ children, className }: { children: React.ReactNode; className?: string }) {
    return <h2 className={`scroll-m-20 text-3xl font-semibold tracking-tight ${className}`}>{children}</h2>;
}

export function TypographyP({ children, className }: { children: React.ReactNode; className?: string }) {
    return <p className={`scroll-m-20 text-xl tracking-tight ${className}`}>{children}</p>;
}
