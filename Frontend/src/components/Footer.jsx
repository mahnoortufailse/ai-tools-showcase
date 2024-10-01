
const Footer = () => {
  return (
    <>
<footer class="bg-primary rounded-lg shadow">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div class="sm:flex sm:items-center sm:justify-between">
            <a href="/" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
            <img src="/Logo.png" alt='logo' className='w-14 h-14 object-contain' />
          <p className='text-white text-[18px] font-bold cursor-pointer flex '>
            AI Tool Generator
           
          </p>
            </a>
            
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" class="hover:underline">Ai Tool Generator™</a>. All Rights Reserved.</span>
    </div>
</footer> 
    </>
  )
}

export default Footer;