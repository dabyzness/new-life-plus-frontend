import { ChangeEvent, FormEvent, useState } from "react";
import { User } from "../../App";

export interface CreateProfileFormProps {
  handleSubmitCreateProfile: Function;
}

function CreateProfileForm(props: CreateProfileFormProps) {
  const [formData, setFormData] = useState<any>({
    name: "",
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await props.handleSubmitCreateProfile(formData);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          autoCorrect="false"
          autoComplete="off"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="name">Name</label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export { CreateProfileForm };
