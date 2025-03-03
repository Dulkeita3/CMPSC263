export default function NavBar () {
    return (   
        <nav className="bg-gray-800 text-white p-4">
        <ul className="flex justify-between items-center">
          <li className="mx-4 hover:text-gray-300">
            <a href="/" className="transition duration-300 ease-in-out">Home</a>
          </li>
          <li className="mx-4 hover:text-gray-300">
            <a href="/about" className="transition duration-300 ease-in-out">About Us</a>
          </li>
          <li className="mx-4 hover:text-gray-300">
            <a href="/contact" className="transition duration-300 ease-in-out">Contact Us</a>
          </li>
          <li className="mx-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
            <a href="/signup" className="block">Sign In/Get Started</a>
          </li>
        </ul>
      </nav>
      
    )
}