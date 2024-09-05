import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [symbolAllowed, setSymbolAllowed] = useState(false);
  const [Password, setPassword] = useState("");

  // useRef
  const PasswordRef = useRef(null);

    // Password Generator
  const PasswordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    
    if (numberAllowed) str += "0123456789";
    if (symbolAllowed) str += "~`!@#$%^&*()_+={[}]|\:;'?/>.<,"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * (str.length + 1));
      pass += str.charAt(char);
    }
    
    setPassword(pass);

  }, [length, numberAllowed, symbolAllowed, setPassword])

  // Copy Button to Clipboard
  const copyPasswordHandler = useCallback(()=>{
    PasswordRef.current?.select();

    // Incase we want to give range for selecting password
    PasswordRef.current?.setSelectionRange(0,20);
    window.navigator.clipboard.writeText(Password);
  } , [Password])

  useEffect(()=>{
    PasswordGenerator() 
  }, [length, numberAllowed, symbolAllowed, PasswordGenerator])
  return (

    <section className='w-full mt-14 max-w-lg mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-600 '>

      <h1 className='text-center text-white text-3xl pt-3 mb-5'>Password Generator</h1>

      {/*Password Field & Copy button */}

      <div className='flex rounded-lg overflow-hidden mb-4 shadow-sm'>
        
        {/* Password Field */}
        <input className='outline-none w-full py-1 px-3' 
        type="text" 
        value = {Password}
        placeholder='Password'
        ref={PasswordRef} 
        readOnly />

        {/* Copy Button */}
        <button className='copyButton outline-none  bg-blue-700 text-white px-3 py-0.5 shrink-0 active:bg-blue-500 transition-all duration-200'
        onClick={copyPasswordHandler}
        data-tooltip="Copied!!"
        >Copy</button>
      </div>

      {/* Checkboxes & Input Slider */}
      <div className='flex text-sm gap-x-2 pb-3'>

        {/* Input Slider */}
        <input type="range" 
        min={1} 
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e) => setLength(e.target.value)} />

        <label >Length: {length}</label>

        {/* Number Checkbox */}
        <div className="flex ml-4 items-center gap-x-1">
        
          <input type="checkbox" 
          id="numberAllowed" 
          defaultChecked = {numberAllowed}
          onChange={() => {setNumberAllowed((prev) => !prev);}}
          />
          <label htmlFor="numberAllowed">Numbers</label>

        </div>

        {/* Symbols Checkbox */}
        <div className="flex items-center gap-x-1"> 
          <input type="checkbox" 
          defaultChecked = {symbolAllowed}
          id="symbolAllowed"
          onChange = {()=>{setSymbolAllowed((prev)=>!prev)}}
          />
          <label htmlFor="symbolAllowed">Symbols</label>
        </div>

      </div>
    
    </section>
  
  )
}

export default App
