import YouTube from "react-youtube";

function Documentation() {
  const videoOptions = {
    width: "100%",

    playerVars: {
      controls: 1,
      modestbranding: 1,
      loop: 0,
    },
  };

  return (
    <div className="w-full px-4 py-10 flex flex-col md:items-center ">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold">Backend Repository</h1>
        <a
          href="https://github.com/Juancapp/shopping-cart-server-v2"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 hover:underline"
        >
          Click here to view the backend repository on GitHub
        </a>
      </div>
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold">Contact</h1>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
          <a
            href="https://github.com/Juancapp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:underline"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/jandrescappuccio/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:underline"
          >
            LinkedIn
          </a>
        </div>
      </div>
      <h1 className="text-4xl font-bold mb-8 text-center">Technologies used</h1>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center justify-center mb-12 md:w-1/4 mx-auto">
        <img
          src="/images/typescript.png"
          alt="typescript"
          className="w-24 h-auto mb-4"
        />
        <div className="p-4 text-center">
          <h3 className="text-lg font-semibold mb-2">TypeScript</h3>
          <p className="text-gray-600">
            A typed superset of JavaScript that compiles to plain JavaScript.
          </p>
        </div>
      </div>
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Front-end technologies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center justify-center">
            <img
              src="/images/react.png"
              alt="react"
              className="w-24 h-auto mb-4"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold mb-2">React</h3>
              <p className="text-gray-600">
                A JavaScript library for building user interfaces.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center justify-center">
            <img
              src="/images/tanstack.png"
              alt="tanstack"
              className="w-24 h-auto mb-4"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold mb-2">TanStack</h3>
              <p className="text-gray-600">
                A set of technologies including TypeScript, Apollo, Next.js, and
                more.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center justify-center">
            <img
              src="/images/zustand.png"
              alt="zustand"
              className="w-24 h-auto mb-4"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold mb-2">Zustand</h3>
              <p className="text-gray-600">
                A small, fast, and scalable state management for React.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center justify-center">
            <img
              src="/images/tailwind.jpg"
              alt="tailwind"
              className="w-24 h-auto mb-4"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold mb-2">Tailwind CSS</h3>
              <p className="text-gray-600">
                A utility-first CSS framework for rapid UI development.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-3xl font-bold mb-4 text-center">
          Back-end technologies
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center justify-center">
            <img
              src="/images/nest.png"
              alt="nest"
              className="w-24 h-auto mb-4"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold mb-2">NestJS</h3>
              <p className="text-gray-600">
                A progressive Node.js framework for building efficient,
                reliable, and scalable server-side applications.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center justify-center">
            <img
              src="/images/fastify.png"
              alt="fastify"
              className="w-24 h-auto mb-4"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold mb-2">Fastify</h3>
              <p className="text-gray-600">
                A fast and low overhead web framework for Node.js.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center justify-center">
            <img
              src="/images/mongo.png"
              alt="mongo"
              className="w-24 h-auto mb-4"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold mb-2">MongoDB</h3>
              <p className="text-gray-600">
                A document-oriented NoSQL database used for high-volume data
                storage.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center justify-center">
            <img
              src="/images/awss3.png"
              alt="aws s3"
              className="w-20 h-auto mb-4"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold mb-2">AWS S3</h3>
              <p className="text-gray-600">
                A scalable object storage service for data archiving and backup.
              </p>
            </div>
          </div>
        </div>
      </div>
      <h2 className="text-4xl mt-12 mb-2 text-black font-extrabold text-center mb-">
        Demo
      </h2>
      <div className="md:w-1/2 w-full md:h-[400px] h-[150px]">
        <YouTube opts={videoOptions} videoId="X8xRbMQg86k" />
      </div>
    </div>
  );
}

export default Documentation;
