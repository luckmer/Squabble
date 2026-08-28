import { cva } from 'class-variance-authority'

export const typography = cva('not-italic select-none', {
  variants: {
    text: {
      h1: 'text-[24px] font-[400] leading-[30px] tracking-[0.48px]',
      h2: 'text-[22px] font-[400] leading-[24px] tracking-[0.44px]',
      h3: 'text-[20px] font-[400] leading-[22px] tracking-[0.4px]',
      h2Medium: 'text-[22px] font-[700] leading-[26px] tracking-[0.44px]',
      caption: 'text-[14px] font-[4i00] leading-[16px] tracking-[0.28px]',
      captionMedium: 'text-[14px] font-[700] leading-[14px] tracking-[0.28px]',
      body: 'text-[16px] font-[400] leading-[16px] tracking-[0.32px]',
      bodyBold: 'text-[16px] font-[700] leading-[16px] tracking-[0.32px]',
      small: 'text-[12px] font-[400] leading-[14px] tracking-[0.24px]',
      smallBold: 'text-[12px] font-[700] leading-[14px] tracking-[0.24px]',
      tiny: 'text-[10px] font-[400] leading-[12px] tracking-[0.2px]',
      tinyBold: 'text-[10px] font-[700] leading-[12px] tracking-[0.2px]',
      custom: '',
    },
    color: {
      white: 'text-text',
      black: 'text-black',
      blue: 'text-background-blue',
    },
    bold: {
      true: 'font-bold',
    },
    uppercase: {
      true: 'uppercase',
    },
    capitalize: {
      true: 'capitalize',
    },
    font: {
      default: 'font-general',
    },
  },
  defaultVariants: {
    font: 'default',
    text: 'caption',
  },
})
