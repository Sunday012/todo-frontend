
export const EmptyTodo = () => {
  return (
    <div className='w-full flex flex-col items-center justify-center mt-10'>
        <div className='w-[80%] space-y-4'>
            <div className='flex items-center justify-between'>
                <p className='text-[#4EA8DE] font-bold text-[14px]'>No todo's currently</p>
                <p className='text-[#5E60CE] font-bold text-[14px]'>Add todo</p>
            </div>
            <div className='flex flex-col pt-5 items-center justify-center rounded-md border-t border-[#262626]'>
             <img src="/Clipboard.png" alt="clipboard" />
             <p className='font-bold text-[#808080] text-[16px] text-center'>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
             <p className='text-[#808080] font-semibold text-[16px] text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
            </div>
        </div>
    </div>
  )
}
