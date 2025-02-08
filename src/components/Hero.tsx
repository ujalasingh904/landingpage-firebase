import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
            Welcome to Our Amazing Platform
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl mb-8">Discover the power of our innovative solutions</p>
          <Button size="lg" className="animate-bounce">
            Get Started
          </Button>
        </div>
      </div>
    </div>
  )
}

