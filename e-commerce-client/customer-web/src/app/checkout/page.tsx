"use client";
import { useEffect, useState } from "react";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [createAccount, setCreateAccount] = useState(false);
  const [shipToDifferentAddress, setShipToDifferentAddress] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
  }, []);

  const subtotal = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.price.replace("£", ""));
    return acc + price * (item.quantity ?? 1);
  }, 0);

  return (
    <div className="min-h-screen bg-[#DEEED9] p-6 grid md:grid-cols-2 gap-8">
      <div className="flex flex-col gap-4">
        <h1 style={{ fontFamily: "Libre Baskerville" }} className="text-[#7FB53D] text-3xl italic font-medium">
          Billing Details</h1>


      {/* Left: Form */}
      <div className="bg-white rounded p-6 shadow-md">
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="First Name" className="border rounded p-2 w-full" />
            <input type="text" placeholder="Last Name" className="border rounded p-2 w-full" />
            <input type="text" placeholder="Phone" className="border rounded p-2 w-full" />
            <input type="email" placeholder="Email" className="border rounded p-2 w-full" />
            <input type="text" placeholder="Country/Region" className="border rounded p-2 w-full" />
            <input type="text" placeholder="Town/City" className="border rounded p-2 w-full" />
            <input type="text" placeholder="Adderess/Street Name" className="border rounded p-2 w-full" />
            <input type="text" placeholder="Postcode" className="border rounded p-2 w-full" />
          </div>
          
          {/* Create Account Checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={createAccount}
              onChange={() => setCreateAccount(!createAccount)}
              className="form-checkbox accent-green-600"
            />
            <label style={{ fontFamily: "'Onest', sans-serif" }} className="text-sm font-medium">
              Create an account?</label>
          </div>

          {/* Password Field if Create Account is Checked */}
          {createAccount && (
            <div>
              <label style={{ fontFamily: "'Onest', sans-serif" }} className="block text-red-600 font-medium mb-1">
                Create account password *</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-red-600 rounded p-2 w-full"
              />
            </div>
          )}

          {/* Ship to Different Address */}
          <div className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={shipToDifferentAddress}
              onChange={() => setShipToDifferentAddress(!shipToDifferentAddress)}
              className="form-checkbox accent-green-600"
            />
            <label style={{ fontFamily: "'Onest', sans-serif" }} className="text-sm font-medium">Ship to a different address?</label>
          </div>

          {/* Additional Shipping Fields if Checked */}
          {shipToDifferentAddress && (
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="First name" className="border rounded p-2 w-full" />
              <input type="text" placeholder="Last name" className="border rounded p-2 w-full" />
              <input type="text" placeholder="Country/Region" className="border rounded p-2 w-full" />
              <input type="text" placeholder="City/Town" className="border rounded p-2 w-full" />
              <input type="text" placeholder="Address/Street Name" className="border rounded p-2 w-full" />
              <input type="text" placeholder="Postcode" className="border rounded p-2 w-full" />
            </div>
          )}

          <textarea placeholder="Note" className="border rounded p-2 w-full" rows={4} />
        </form>
      </div>
    </div>
      

    {/* Right: Product Details */}
    <div className="flex flex-col gap-6 w-full">
    <div className="bg-white rounded-[40px] p-6 shadow-md self-start w-full mt-13">
      <h3 style={{ fontFamily: "'Onest', sans-serif" }} className="text-lg font-medium mb-4">
        Your Order</h3>
      <ul className="space-y-4">
        {cartItems.map((item, i) => (
          <li key={i} className="flex justify-between border-b pb-2">
            <div>
              <h4 className="font-medium">{item.name}</h4>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p>£{(parseFloat(item.price.replace("£", "")) * (item.quantity ?? 1)).toFixed(2)}</p>
          </li>
        ))}
        </ul>
        <div className="border-t pt-4 mt-4 flex justify-between font-bold">
          <span style={{ fontFamily: "'Onest', sans-serif" }} >Total</span>
          <span>£{subtotal.toFixed(2)}</span>
        </div>
        </div>
        
        {/* ✅ Payment Section */}
        <div className="mt-8 pt-6 bg-white rounded">
          <h3 style={{ fontFamily: "'Onest', sans-serif" }} className="text-lg font-medium mb-4 px-3">
            Credit / Debit Card</h3>
          <div className="bg-gray-100 p-4 rounded shadow-sm px-3 mr-3 ml-3">
            <label style={{ fontFamily: "'Onest', sans-serif" }} className="block text-sm font-medium mb-1">
              Card number</label>
            <input
              type="text"
              placeholder="1234 1234 1234 1234"
              className="w-full border border-gray-300 rounded p-2 mb-4"
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label style={{ fontFamily: "'Onest', sans-serif" }} className="block text-sm font-medium mb-1">
                  Expiration date</label>
                <input
                  type="text"
                  placeholder="MM / YY"
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <div>
                <label style={{ fontFamily: "'Onest', sans-serif" }} className="block text-sm font-medium mb-1">
                  Security code</label>
                <input
                  type="text"
                  placeholder="CVC"
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
            </div>

            <div className="mt-4 flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox accent-green-600" />
              <label  className="text-sm">
                Save payment information to my account for future purchases.</label>
            </div>
          </div>

          {/* Privacy Note */}
          <p className="text-sm text-gray-600 mt-4 px-3">
            Your personal data will be used to process your order, support your experience throughout this website,
            and for other purposes described in our <a href="#" className="text-orange-500 underline">privacy policy</a>.
          </p>

          {/* Place Order Button */}
          <div className="flex justify-end mt-6 mb-3 mr-5">
            <button className=" bg-[#7FB53D] text-white py-2 px-4 rounded-full w-fit 
            cursor-pointer hover:bg-green-100 hover:text-[#7FB53D] ">
              Place Order
            </button>
          </div>

        </div>
      </div>
    </div>
    
  );
};

export default CheckoutPage;
