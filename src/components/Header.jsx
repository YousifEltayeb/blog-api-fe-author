function Header() {
  return (
    <header class="min-w-full border-b max-w-7xl">
      <nav class=" max-w-fit mx-auto">
        <div class="flex items-center justify-between h-16">
          <div class=" flex items-center">
            <div>
              <div class="flex items-baseline ml-10 space-x-4">
                <a
                  class="text-gray-500  hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
                  href="/"
                >
                  Home
                </a>
                <a
                  class="text-gray-500  hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
                  href="/comments"
                >
                  Comments
                </a>
                <a
                  class="text-gray-500  hover:text-gray-800 px-3 py-2 rounded-md text-sm font-medium"
                  href="/logout"
                >
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
