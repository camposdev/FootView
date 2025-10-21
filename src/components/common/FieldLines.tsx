export const FieldLines = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute size-15 rounded-full border-8 border-white top-0 left-0 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute size-15 rounded-full border-8 border-white bottom-0 left-0 -translate-x-1/2 translate-y-1/2"></div>
      <div className="absolute size-15 rounded-full border-8 border-white top-0 right-0 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute size-15 rounded-full border-8 border-white bottom-0 right-0 translate-x-1/2 translate-y-1/2"></div>
      <div className="absolute h-full w-2 bg-green-400 top-0 left-1/2"></div>
      <div className="absolute size-10 rounded-full bg-green-400 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

      <div className="absolute size-[200px] xl:size-[240px] rounded-full border-8 border-green-400 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-80"></div>
      <div className="absolute w-[160px] h-[250px] xl:w-[200px] xl:h-[300px] -left-2 top-1/2 -translate-y-1/2 border-8 border-green-400 rounded-lg opacity-80"></div>
      <div className="absolute w-[160px] h-[250px] xl:w-[200px] xl:h-[300px] -right-2 top-1/2 -translate-y-1/2 border-8 border-green-400 rounded-lg opacity-80"></div>
    </div>
  )
}
