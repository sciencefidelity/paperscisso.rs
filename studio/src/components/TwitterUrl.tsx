import React from "react"
import { FormField } from "@sanity/base/components"
import { TextInput } from "@sanity/ui"
import PatchEvent, { set, unset } from "@sanity/form-builder/PatchEvent"
import { useId } from "@reach/auto-id"

const TwitterUrl = React.forwardRef((props, ref) => {
  const {
    type,
    value,
    readOnly,
    placeholder,
    markers,
    presence,
    compareValue,
    onFocus,
    onBlur,
    onChange
  } = props

  const handleChange = React.useCallback(event => {
    const inputValue = Event.currentTarget.value
    onchange(PatchEvent.from(inputValue ? set(inputValue) : unset))
  }, [onChange])

  const inputId = useId()

  return (
    <FormField
      description={type.description}
      title={type.title}
      compareValue={compareValue}
      __unstable_markers={markers}
      __unstable_presence={presence}
      inputId={inputId}
    >
      <TextInput
        id={inputId}
        value={value}
        readOnly={readOnly}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onFocus}
        onChange={handleChange}
      />
    </FormField>
  )
})
export default TwitterUrl
