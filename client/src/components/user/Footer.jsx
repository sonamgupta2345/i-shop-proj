"use client"
export default function Footer() {
  return (
    <footer className="max-w-7xl mx-auto bg-gray-100 text-gray-600 text-sm ">
      <div className=" px-6 py-12 grid grid-cols-1 md:grid-cols-5 gap-8">

        {/* Column 1 */}
        <div>
          <h3 className="font-semibold text-black mb-3">
            SWOO - 1ST NYC TECH ONLINE MARKET
          </h3>
          <p className="text-red-500 text-lg font-semibold mb-2">
            (025) 3686 25 16
          </p>
          <p className="mb-2">
            257 Thatcher Road St, Brooklyn, Manhattan,<br />
            NY 10092
          </p>
          <p className="mb-4">contact@swoolab.com</p>

          {/* Social Icons */}
          <div className="flex gap-2">
            <span className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow">f</span>
            <span className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow">t</span>
            <span className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow">i</span>
            <span className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow">y</span>
          </div>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="font-semibold text-black mb-3">TOP CATEGORIES</h3>
          <ul className="space-y-1">
            <li>Laptops</li>
            <li>PC & Computers</li>
            <li>Cell Phones</li>
            <li>Tablets</li>
            <li>Gaming & VR</li>
            <li>Networks</li>
            <li>Cameras</li>
            <li>Sounds</li>
            <li>Office</li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="font-semibold text-black mb-3">COMPANY</h3>
          <ul className="space-y-1">
            <li>About Swoo</li>
            <li>Contact</li>
            <li>Career</li>
            <li>Blog</li>
            <li>Sitemap</li>
            <li>Store Locations</li>
          </ul>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="font-semibold text-black mb-3">HELP CENTER</h3>
          <ul className="space-y-1">
            <li>Customer Service</li>
            <li>Policy</li>
            <li>Terms & Conditions</li>
            <li>Track Order</li>
            <li>FAQs</li>
            <li>My Account</li>
            <li>Product Support</li>
          </ul>
        </div>

        {/* Column 5 */}
        <div>
          <h3 className="font-semibold text-black mb-3">PARTNER</h3>
          <ul className="space-y-1 mb-4">
            <li>Become Seller</li>
            <li>Affiliate</li>
            <li>Advertise</li>
            <li>Partnership</li>
          </ul>

          {/* Subscribe */}
          <h4 className="font-semibold text-black mb-2">
            SUBSCRIBE & GET <span className="text-red-500">10% OFF</span> FOR YOUR FIRST ORDER
          </h4>

          <div className="flex mt-2">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-3 py-2 border rounded-l-lg focus:outline-none"
            />
            <button className="bg-red-500 text-white px-4 rounded-r-lg">
              SUBSCRIBE
            </button>
          </div>

          <p className="text-xs mt-2">
            By subscribing, you're accepted the our Policy
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t py-4 px-6 flex flex-col md:flex-row justify-between items-center text-xs">
        <p>© 2024 <span className="font-semibold">Shawonetc</span>. All Rights Reserved</p>

        <div className="flex gap-3 mt-2 md:mt-0">
          <span>PayPal</span>
          <span>Visa</span>
          <span>Stripe</span>
          <span>Klarna</span>
        </div>

        <p className="mt-2 md:mt-0 text-blue-500 cursor-pointer">
          Mobile Site
        </p>
      </div>
    </footer>
  );
}