import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function NavBar({ onHome, onNewPost }) {
  const navigation = [
    { name: 'Add New', current: false, onClick: onNewPost },
  ];

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <div className=" px-2 sm:px-6 lg:px-8">
          <div className="flex items-center  h-16">
            {/* Place "My Dam App" at the leftmost corner */}
            <h1 className="text-white ml-4">My Dam App</h1>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
           
            <div className="flex items-center justify-center flex-1">
              <div className="hidden sm:block">
                <button onClick={onHome} className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  />
                  <h1 className="text-white ml-2">Dashboard</h1>
                </button>
              </div>

              <div className=" mx-auto ml-6 hidden sm:flex items-center space-x-4">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={item.onClick}
                    className={classNames(
                      item.current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'px-3 py-2 rounded-md text-sm font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="sm:hidden">
              {/* Mobile menu button */}
              <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
            </div>
          </div>
        </div>
      )}
    </Disclosure>
  );
}
