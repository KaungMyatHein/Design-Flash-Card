# Error Prevention
# Error Prevention (အမှားကြိုတင်ကာကွယ်ခြင်း)

## Question
What is Error Prevention in UX and how does it differ from error recovery?

## Question_MM
UX မှာ Error Prevention ဆိုတာ ဘာလဲ၊ error recovery နဲ့ ဘယ်လိုကွာတာလဲ?

## Answer
Error Prevention means designing systems so users can't make mistakes in the first place, rather than relying on error messages after the mistake. Prevention is always better than recovery.

## Answer_MM
User မှားပြီးမှ error message ပြမယ့်အစား မှားလို့ မရအောင် system ကိုပဲ ဒီဇိုင်းဆွဲတာ။ Recovery ထက် prevention က အမြဲ ပိုကောင်းတယ်။

## Why
- Don Norman: 2 types of errors — slips (unintended actions) and mistakes (wrong understanding)
- Slips can be prevented with constraints and undo features
- Mistakes can be prevented with confirmation dialogs and clear feedback
- Preventing errors uses less cognitive load than fixing them after
- "Swiss cheese model": more safety layers = less chance errors get through

## Why_MM
- Don Norman: error ၂ မျိုးရှိတယ် — slips (မှတ်မထင် လွဲ) နဲ့ mistakes (နားလည်မှု မှားတာ)
- Slips ကို constraints နဲ့ undo feature နဲ့ ကာကွယ်လို့ရတယ်
- Mistakes ကို confirmation dialog နဲ့ feedback ကောင်းကောင်းပေးပြီး ကာကွယ်
- Error message ပြပြီး ပြင်ခိုင်းတာထက် error မဖြစ်အောင်လုပ်တာ ဦးနှောက် ပိုသက်သာတယ်
- Safety layer ပိုများလေ error ဖြတ်သွားနိုင်ခြေ နည်းလေ

## Example
- Graying out unavailable dates in a date picker
- "Are you sure you want to delete?" confirmation dialogs
- Gmail's "Undo Send" giving 30 seconds to cancel
- Form validation showing errors in real-time as you type

## Example_MM
- Date picker မှာ မရတဲ့ ရက်တွေကို gray ထားတယ်
- "ဖျက်မှာ သေချာလား?" ဆိုတဲ့ confirmation dialog ပေါ်လာတယ်
- Gmail မှာ "Undo Send" နှိပ်ရင် ၃၀ စက္ကန့်အတွင်း cancel လုပ်လို့ရတယ်
- Form ဖြည့်နေတုန်း error ကို real-time ချက်ချင်း ပြတယ်

## Tags
error-prevention, constraints, undo, confirmation, usability, don-norman

## Source
The Design of Everyday Things — Don Norman
