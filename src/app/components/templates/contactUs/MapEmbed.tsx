export default function MapEmbed() {
  return (
    <div className="w-full h-full min-h-[340px] rounded-2xl overflow-hidden shadow-md border border-gray-100">
      <iframe
        title="موقعیت مکانی"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d107152.16285683427!2d49.4983568!3d37.2808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f89d9e1cb5eb993%3A0x6cd19b2f6e9b95e8!2sRasht%2C%20Gilan%20Province%2C%20Iran!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: "340px" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
