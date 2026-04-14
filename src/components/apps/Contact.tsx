import React, { useState } from 'react';
import { Send, Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const Contact: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Get In Touch</h1>
        <p className="text-muted-foreground">Have a project in mind? Let's talk about it.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 flex-shrink-0">
              <Mail size={20} />
            </div>
            <div>
              <h3 className="text-sm font-semibold">Email</h3>
              <p className="text-xs text-muted-foreground">hello@designer.com</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 flex-shrink-0">
              <Phone size={20} />
            </div>
            <div>
              <h3 className="text-sm font-semibold">Phone</h3>
              <p className="text-xs text-muted-foreground">+1 (555) 123-4567</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500 flex-shrink-0">
              <MapPin size={20} />
            </div>
            <div>
              <h3 className="text-sm font-semibold">Location</h3>
              <p className="text-xs text-muted-foreground">San Francisco, CA</p>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2">
          {isSubmitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 p-8 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
              <CheckCircle2 size={48} className="text-emerald-500" />
              <h2 className="text-xl font-bold">Message Sent!</h2>
              <p className="text-sm text-muted-foreground">Thank you for reaching out. I'll get back to you as soon as possible.</p>
              <Button variant="outline" onClick={() => setIsSubmitted(false)}>Send another message</Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-medium opacity-70">Name</label>
                  <Input placeholder="John Doe" required className="bg-white/5 border-white/10" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium opacity-70">Email</label>
                  <Input type="email" placeholder="john@example.com" required className="bg-white/5 border-white/10" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-medium opacity-70">Subject</label>
                <Input placeholder="Project Inquiry" required className="bg-white/5 border-white/10" />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-medium opacity-70">Message</label>
                <textarea 
                  className="w-full min-h-[150px] rounded-md bg-white/5 border border-white/10 p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>
              
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                <Send size={16} className="mr-2" />
                Send Message
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
