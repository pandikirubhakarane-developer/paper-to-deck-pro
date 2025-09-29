import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Play, Code, Database, ShoppingCart, Zap, Globe, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Slide {
  id: number;
  title: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

const GraphQLCode = ({ children, className }: { children: string; className?: string }) => (
  <pre className={cn("code-block text-sm overflow-x-auto", className)}>
    <code dangerouslySetInnerHTML={{
      __html: children
        .replace(/\b(query|mutation|site|product|cart|checkout)\b/g, '<span class="graphql-keyword">$1</span>')
        .replace(/\b(entityId|name|description|prices|variants)\b/g, '<span class="graphql-field">$1</span>')
        .replace(/\b(String|Int|Float|Boolean)\b/g, '<span class="graphql-type">$1</span>')
        .replace(/"([^"]*)"/g, '<span class="graphql-string">"$1"</span>')
    }} />
  </pre>
);

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      id: 0,
      title: "BigCommerce GraphQL Deep Dive",
      icon: <Globe className="w-8 h-8" />,
      content: (
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30">
              <Globe className="w-6 h-6 text-primary" />
              <span className="text-lg font-semibold">Complete Guide to GraphQL Storefront API</span>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Master the art of building headless storefronts with BigCommerce GraphQL API
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { icon: <Database className="w-6 h-6" />, label: "Products & Categories" },
              { icon: <ShoppingCart className="w-6 h-6" />, label: "Cart Management" },
              { icon: <Zap className="w-6 h-6" />, label: "Performance" },
              { icon: <Settings className="w-6 h-6" />, label: "Error Handling" }
            ].map((item, index) => (
              <Card key={index} className="animated-border glow-effect">
                <CardContent className="p-4 text-center">
                  <div className="text-primary mb-2 flex justify-center">{item.icon}</div>
                  <p className="text-sm font-medium">{item.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )
    },
    {
      id: 1,
      title: "Overview of BigCommerce GraphQL Storefront API",
      icon: <Code className="w-8 h-8" />,
      content: (
        <div className="space-y-6">
          <Card className="animated-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5 text-primary" />
                What is BigCommerce GraphQL API?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Badge variant="secondary" className="mt-1">API</Badge>
                  <span>A GraphQL API provided by BigCommerce for headless storefronts</span>
                </li>
                <li className="flex items-start gap-3">
                  <Badge variant="secondary" className="mt-1">Frontend</Badge>
                  <span>Allows React, Next.js, etc. to query exactly the data needed</span>
                </li>
                <li className="flex items-start gap-3">
                  <Badge variant="secondary" className="mt-1">Performance</Badge>
                  <span>Reduces over-fetching and under-fetching of data</span>
                </li>
                <li className="flex items-start gap-3">
                  <Badge variant="secondary" className="mt-1">Use Cases</Badge>
                  <span>Powers custom storefronts, mobile apps, and integrations</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="glow-effect">
              <CardHeader>
                <CardTitle className="text-destructive">❌ REST API Challenges</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Multiple API calls needed (products → inventory → pricing separately)</p>
              </CardContent>
            </Card>
            <Card className="glow-effect">
              <CardHeader>
                <CardTitle className="text-accent">✅ GraphQL Advantages</CardTitle>
              </CardHeader>
              <CardContent>
                <p>One request with specified fields → faster page load</p>
              </CardContent>
            </Card>
          </div>

          <Card className="animated-border">
            <CardHeader>
              <CardTitle>🔑 Key Capabilities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <Database className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold">Products & Categories</h4>
                  <p className="text-sm text-muted-foreground">PLPs, filters, menus</p>
                </div>
                <div className="text-center p-4 bg-accent/10 rounded-lg">
                  <Settings className="w-8 h-8 text-accent mx-auto mb-2" />
                  <h4 className="font-semibold">Product Details</h4>
                  <p className="text-sm text-muted-foreground">Variants, pricing, inventory</p>
                </div>
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <ShoppingCart className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold">Cart & Checkout</h4>
                  <p className="text-sm text-muted-foreground">Full e-commerce flow</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 2,
      title: "Fetching Products",
      icon: <Database className="w-8 h-8" />,
      content: (
        <div className="space-y-6">
          <Card className="animated-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-primary" />
                Products Query
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Badge variant="outline">Entry point: site.products</Badge>
                <p className="text-muted-foreground">Perfect for product listing pages (PLPs), search results, and recommendations</p>
                <p className="text-sm text-muted-foreground">✨ Supports pagination, filters, and sorting</p>
              </div>
              
              <GraphQLCode>
{`query GetProducts {
  site {
    products(first: 5) {
      edges {
        node {
          entityId
          name
          description
          prices {
            price { value currencyCode }
            salePrice { value currencyCode }
          }
        }
      }
    }
  }
}`}
              </GraphQLCode>
              
              <div className="bg-accent/10 p-4 rounded-lg">
                <h4 className="font-semibold text-accent mb-2">📤 Output</h4>
                <p>Returns product ID, name, description, and pricing information</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 3,
      title: "Fetching Categories & Brands",
      icon: <Settings className="w-8 h-8" />,
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="animated-border glow-effect">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Badge variant="outline">Entry point: site.categories</Badge>
                  <p className="text-sm text-muted-foreground">Essential for menus, navigation, and faceted filters</p>
                </div>
                
                <GraphQLCode className="text-xs">
{`query GetCategories {
  site {
    categoryTree {
      name
      path
      entityId
    }
  }
}`}
                </GraphQLCode>
                
                <div className="bg-primary/10 p-3 rounded-lg">
                  <p className="text-sm">📤 Returns nested category structure</p>
                </div>
              </CardContent>
            </Card>

            <Card className="animated-border glow-effect">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-accent" />
                  Brands
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Badge variant="outline">Entry point: site.brands</Badge>
                  <p className="text-sm text-muted-foreground">Perfect for "Shop by Brand" pages and filters</p>
                </div>
                
                <GraphQLCode className="text-xs">
{`query GetBrands {
  site {
    brands(first: 5) {
      edges {
        node {
          name
          entityId
        }
      }
    }
  }
}`}
                </GraphQLCode>
                
                <div className="bg-accent/10 p-3 rounded-lg">
                  <p className="text-sm">📤 Returns brand IDs and names</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "Product Detail Pages - Variants",
      icon: <Zap className="w-8 h-8" />,
      content: (
        <div className="space-y-6">
          <Card className="animated-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Product Variants & Options
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-primary/10 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">💡 What are Variants?</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Different options of a product (size, color, material)</li>
                  <li>• Stored under product.variants</li>
                  <li>• Essential for PDPs to allow correct option selection</li>
                </ul>
              </div>
              
              <GraphQLCode>
{`query ProductVariants($id: Int!) {
  site {
    product(entityId: $id) {
      name
      variants(first: 5) {
        edges {
          node {
            entityId
            sku
            options {
              edges {
                node {
                  displayName
                  values { 
                    edges { 
                      node { label } 
                    } 
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`}
              </GraphQLCode>
              
              <div className="bg-accent/10 p-4 rounded-lg">
                <h4 className="font-semibold text-accent mb-2">📤 Example Output</h4>
                <p>Shows available options like:</p>
                <div className="flex gap-2 mt-2">
                  <Badge>Size: S, M, L</Badge>
                  <Badge>Color: Red, Blue</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 5,
      title: "Pricing Information",
      icon: <Settings className="w-8 h-8" />,
      content: (
        <div className="space-y-6">
          <Card className="animated-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-accent" />
                Dynamic Pricing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold">🏷️ Pricing Features</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">Base</Badge>
                      Regular pricing
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">Sale</Badge>
                      Promotional pricing
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">Currency</Badge>
                      Multi-currency support
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">Tax</Badge>
                      Tax information
                    </li>
                  </ul>
                </div>
                
                <div className="bg-accent/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-accent mb-2">⚡ Dynamic Updates</h4>
                  <p className="text-sm">Pricing automatically updates when store runs promotions</p>
                </div>
              </div>
              
              <GraphQLCode>
{`site {
  product(entityId: 123) {
    name
    prices {
      price { value currencyCode }
      salePrice { value currencyCode }
      tax { value currencyCode }
    }
  }
}`}
              </GraphQLCode>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 6,
      title: "Cart Management",
      icon: <ShoppingCart className="w-8 h-8" />,
      content: (
        <div className="space-y-6">
          <Card className="animated-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-primary" />
                Cart API Operations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-primary/10 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">🎯 Purpose & Features</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Maintains shopper's state across devices and sessions</li>
                  <li>• Server-side cart entity for reliability</li>
                  <li>• Real-time inventory validation</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">🔧 Operations</h4>
                  <div className="space-y-1">
                    <Badge variant="outline">createCart</Badge>
                    <Badge variant="outline">addCartLineItems</Badge>
                    <Badge variant="outline">deleteCart</Badge>
                    <Badge variant="outline">update quantities</Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold">🔑 Key Elements</h4>
                  <div className="space-y-1">
                    <Badge variant="secondary">cartEntityId</Badge>
                    <Badge variant="secondary">storefront tokens</Badge>
                    <Badge variant="secondary">customer tokens</Badge>
                  </div>
                </div>
              </div>

              <GraphQLCode>
{`mutation addCartLineItems($addCartLineItemsInput: AddCartLineItemsInput!) {
  cart {
    addCartLineItems(input: $addCartLineItemsInput) {
      cart { 
        entityId 
        lineItems { 
          physicalItems { 
            name 
            quantity 
            sku 
          } 
        } 
      }
      errors { 
        ... on Error { message } 
      }
    }
  }
}`}
              </GraphQLCode>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 7,
      title: "Checkout API Basics",
      icon: <Zap className="w-8 h-8" />,
      content: (
        <div className="space-y-6">
          <Card className="animated-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-accent" />
                Checkout Flow
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-accent/10 p-4 rounded-lg">
                <h4 className="font-semibold text-accent mb-3">🔄 Complete Flow</h4>
                <div className="flex flex-wrap gap-2">
                  {['Create Cart', 'Fill Shipping & Billing', 'Select Shipping Option', 'Complete Checkout'].map((step, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Badge variant="secondary">{index + 1}</Badge>
                      <span className="text-sm">{step}</span>
                      {index < 3 && <span className="text-muted-foreground">→</span>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-primary/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">📤 Returns</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• orderEntityId</li>
                    <li>• paymentAccessToken</li>
                  </ul>
                </div>
                
                <div className="bg-secondary/20 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">💳 Payment Note</h4>
                  <p className="text-sm">Payments handled by separate Payments API (GraphQL doesn't handle PCI operations)</p>
                </div>
              </div>

              <GraphQLCode>
{`mutation completeCheckout($completeCheckoutInput: CompleteCheckoutInput!) {
  checkout {
    completeCheckout(input: $completeCheckoutInput) {
      orderEntityId
      paymentAccessToken
    }
  }
}`}
              </GraphQLCode>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 8,
      title: "Using GraphQL Queries & Mutations",
      icon: <Code className="w-8 h-8" />,
      content: (
        <div className="space-y-6">
          <Card className="animated-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5 text-primary" />
                Best Practices
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold">🔧 Request Format</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• POST to /graphql endpoint</li>
                    <li>• JSON payload: {`{ query, variables }`}</li>
                    <li>• Bearer token authentication</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold">⚡ Optimization</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Use variables for dynamic data</li>
                    <li>• Implement fragments for reusability</li>
                    <li>• Select only needed fields</li>
                  </ul>
                </div>
              </div>

              <div className="bg-primary/10 p-4 rounded-lg">
                <h4 className="font-semibold text-primary mb-2">🔐 Authentication</h4>
                <div className="space-y-1">
                  <Badge variant="outline">Storefront API token (Bearer)</Badge>
                  <Badge variant="outline">Optional customer token</Badge>
                </div>
              </div>

              <GraphQLCode>
{`const query = \`mutation addCart($input: AddCartLineItemsInput!) {
  cart { 
    addCartLineItems(input: $input) { 
      cart { entityId } 
      errors { 
        ... on Error { message } 
      } 
    } 
  }
}\`;

// Send with variables and authentication
fetch('/graphql', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ query, variables: input })
})`}
              </GraphQLCode>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      id: 9,
      title: "Error Handling & UX",
      icon: <Settings className="w-8 h-8" />,
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="animated-border glow-effect">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <Settings className="w-5 h-5" />
                  Error Handling
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="bg-destructive/10 p-3 rounded-lg">
                    <h4 className="font-semibold mb-2">⚠️ Key Points</h4>
                    <ul className="space-y-1 text-xs">
                      <li>• GraphQL can return partial data + errors</li>
                      <li>• Handle network/HTTP errors separately</li>
                      <li>• Show user-friendly error messages</li>
                      <li>• Log GraphQL errors server-side</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">🔧 Error Types</h4>
                    <div className="space-y-1">
                      <Badge variant="destructive" className="text-xs">Out of stock</Badge>
                      <Badge variant="destructive" className="text-xs">Invalid selections</Badge>
                      <Badge variant="destructive" className="text-xs">Network issues</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="animated-border glow-effect">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-accent">
                  <Zap className="w-5 h-5" />
                  Loading & UX
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="bg-accent/10 p-3 rounded-lg">
                    <h4 className="font-semibold mb-2">✨ UX Best Practices</h4>
                    <ul className="space-y-1 text-xs">
                      <li>• Use skeleton loaders for heavy views</li>
                      <li>• Optimistic UI for cart actions</li>
                      <li>• Clear states: loading, success, error, empty</li>
                      <li>• Rollback on failure</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">🎯 User States</h4>
                    <div className="space-y-1">
                      <Badge variant="secondary" className="text-xs">Loading</Badge>
                      <Badge variant="secondary" className="text-xs">Success</Badge>
                      <Badge variant="secondary" className="text-xs">Error</Badge>
                      <Badge variant="secondary" className="text-xs">Empty</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="animated-border">
            <CardHeader>
              <CardTitle>💻 Implementation Example</CardTitle>
            </CardHeader>
            <CardContent>
              <GraphQLCode>
{`const { data, errors } = await fetchGraphQL(query, vars);

if (errors && errors.length) {
  console.error('GraphQL errors', errors);
  showBanner('Something went wrong updating your cart. Please retry.');
}

if (data) { 
  // Use data successfully
  updateUI(data);
}`}
              </GraphQLCode>
            </CardContent>
          </Card>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="min-h-screen bg-background">
      <div className="slide-bg" />
      
      {/* Header */}
      <header className="relative z-20 border-b border-border/20 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {currentSlideData.icon && (
                <div className="text-primary">{currentSlideData.icon}</div>
              )}
              <h1 className="text-xl font-bold">{currentSlideData.title}</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {currentSlide + 1} / {slides.length}
              </span>
              <div className="flex gap-1">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      index === currentSlide ? "bg-primary w-6" : "bg-muted-foreground/30"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="slide-content container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {currentSlideData.content}
        </div>
      </main>

      {/* Navigation */}
      <footer className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-30">
        <div className="flex items-center gap-4 bg-card/80 backdrop-blur-sm border border-border/20 rounded-full px-6 py-3 shadow-lg">
          <Button
            variant="outline"
            size="sm"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="rounded-full"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentSlide(0)}
            className="rounded-full"
          >
            <Play className="w-4 h-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="rounded-full"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default Presentation;