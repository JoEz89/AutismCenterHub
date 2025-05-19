import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import Courses from "@/pages/Courses";
import Appointments from "@/pages/Appointments";
import Admin from "@/pages/Admin";
import { CartProvider } from "@/context/CartContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/products" component={Products} />
      <Route path="/courses" component={Courses} />
      <Route path="/appointments" component={Appointments} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <Toaster />
            <main className="flex-grow">
              <Router />
            </main>
            <Footer />
          </div>
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
