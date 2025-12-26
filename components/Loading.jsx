export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <div className="relative w-16 h-16">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 rounded-full"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <h2 className="mt-4 text-xl font-bold text-gray-700 animate-pulse">TechMart</h2>
            <p className="text-gray-500 text-sm">Loading best products...</p>
        </div>
    );
}
