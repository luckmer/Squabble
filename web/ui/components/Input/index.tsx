import { FC, useId } from 'react'

export interface IProps {
  label: string
  placeholder: string
  externalChildren?: React.ReactNode
  onChange: (value: string) => void
  value: string
  type?: string
  error?: string
}

const Input: FC<IProps> = ({
  label,
  placeholder,
  value,
  externalChildren,
  onChange,
  type = 'text',
  error,
}) => {
  const id = useId()
  return (
    <div className='flex flex-col gap-8'>
      <div className='flex justify-between'>
        <label htmlFor={id} className='text-[14px] font-400 leading-16 tracking-[0.28px]'>
          {label}
        </label>
        {externalChildren}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={(e) => {
          e.preventDefault()
          onChange(e.target.value)
        }}
        aria-invalid={!!error}
        className={`text-[14px] border rounded-xl px-12 py-[6.5px] placeholder:text-[14px] duration-200 transition-colors outline-none focus:outline-none ${
          error
            ? 'border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/30'
            : 'border-border hover:border-border focus:border-ring focus:ring-2 focus:ring-ring/30'
        }`}
      />
      {error && <span className='text-[12px] text-destructive'>{error}</span>}
    </div>
  )
}

export default Input
