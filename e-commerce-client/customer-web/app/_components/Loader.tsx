import React from 'react';

const PageLoader = () => {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center">
      <div className="relative flex flex-col items-center">
        {/* Animated dots */}
        <div className="flex space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-primary rounded-full"
              style={{
                animation: `bounce 1.4s ease-in-out ${i * 0.16}s infinite`
              }}
            />
          ))}
        </div>

        <style jsx>{`
          @keyframes bounce {
            0%, 80%, 100% { 
              transform: translateY(0);
            } 
            40% { 
              transform: translateY(-12px);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export const Loader = ({ loading, children }: { loading: boolean; children: React.ReactNode }) => {
  if (loading) {
    return <PageLoader />;
  }

  return children;
};