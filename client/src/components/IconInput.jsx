
export  function IconInput({ icon, wrapperClass = "", ...props }) {
  return (
    <div className={`flex items-center w-full px-3 py-2 bg-white border border-gray-300 rounded-2xl transition-all duration-200 focus-within:border-primgreen focus-within:ring-2 focus-within:ring-primgreen/30 ${wrapperClass}`}>
      
      {/* The Icon */}
      {icon && (
        <span className="flex items-center justify-center text-gray-500 mr-2">
          {icon}
        </span>
      )}
      
      {/* The Invisible Input - NOW COMPLETELY STRIPPED */}
      <input 
        className="w-full bg-transparent border-0 p-0 outline-none focus:outline-none focus:ring-0 focus:border-transparent shadow-none text-gray-900 placeholder-gray-400" 
        {...props} 
      />
    </div>
  );
};

// Using named export for PasswordInput
export function PasswordInput({ icon1, icon2, wrapperClass = "", onIcon2Click, ...props }) {
  return (
    <div className={`flex items-center w-full px-3 py-2 bg-white border border-gray-300 rounded-2xl transition-all duration-200 focus-within:border-primgreen focus-within:ring-2 focus-within:ring-primgreen/30 ${wrapperClass}`}>
      
      {icon1 && (
        <span className="flex items-center justify-center text-gray-500 mr-2">
          {icon1}
        </span>
      )}
      
      {/* The Invisible Input - NOW COMPLETELY STRIPPED */}
      <input 
        className="w-full bg-transparent border-0 p-0 outline-none focus:outline-none focus:ring-0 focus:border-transparent shadow-none text-gray-900 placeholder-gray-400" 
        {...props} 
      />

      {icon2 && (
        <button 
          type="button" 
          onClick={onIcon2Click}
          className="flex items-center justify-center text-gray-500 ml-2 hover:text-gray-700 transition-colors"
        >
          {icon2}
        </button>
      )}
    </div>
  );
}