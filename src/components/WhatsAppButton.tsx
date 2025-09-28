import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => {
  const handleClick = () => {
    // Replace with actual doctor's phone number
    const phoneNumber = "[Doctor's Phone Number]";
    const message = encodeURIComponent("Hello Dr. [Name], I would like to schedule an appointment.");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="floating-button fixed bottom-8 right-8 bg-gradient-to-r from-primary to-primary-light text-primary-foreground rounded-full p-4 md:p-5 shadow-strong hover:shadow-2xl transition-all duration-300 z-50 group"
      aria-label="Book Appointment via WhatsApp"
    >
      <div className="flex items-center gap-3">
        <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
        <span className="hidden md:block font-medium text-sm lg:text-base whitespace-nowrap">
          Book Appointment
        </span>
      </div>
      
      {/* Pulse animation ring */}
      <div className="absolute inset-0 rounded-full bg-primary opacity-20 animate-ping"></div>
      
      {/* Tooltip for mobile */}
      <div className="md:hidden absolute bottom-full right-0 mb-2 bg-foreground text-background px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        Book Appointment
        <div className="absolute top-full right-4 border-4 border-transparent border-t-foreground"></div>
      </div>
    </button>
  );
};

export default WhatsAppButton;