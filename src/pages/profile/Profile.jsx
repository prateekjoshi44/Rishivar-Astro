import {
  useGetProfileQuery,
  usePostProfileMutation,
} from "../../services/authSlice";
import { usePostUploadMutation } from "../../services/uploadSlice";
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import ApiErrorModal from "../../components/modal/ApiErrorModal";
import PageLoading from "../../components/PageLoading";
import CheckboxGroup from "../../components/form/CheckboxGroup";
import { CATEGORIES, LANGUAGES, SKILLS } from "../../constants/Constants";
import Page from "../../layout/Page";
import SuccessModal from "../../components/modal/SuccessModal ";
import ProfilePictureInput from "../../components/form/ProfilePictureInput";
import "react-phone-input-2/lib/style.css";
import PhoneNumberInput from "../../components/form/PhoneNumberInput";

const Profile = () => {
  const astroRes = useGetProfileQuery();
  const [postProfile, postProfileRes] = usePostProfileMutation();
  const [uploadImage, uploadImageRes] = usePostUploadMutation();

  const onSubmit = async (event) => {


    try {
      event.preventDefault();
      const form = event.target;

      if (form.checkValidity()) {
        const name = form["name"].value;
        const phone = form["phone"].value.replace("-", "").replace(" ", "");
        const dob = form["date of birth"].value;
        const description = form["description"].value;
        const videoCallPrice = form['video Call Price'].value;
        const audioCallPrice = form['audio Call Price'].value;
        const chatPrice = form["chat price"].value;
        const experience = form["experience(in years)"].value;
        const languages = Array.from(form["languages"])
          .filter((i) => i.checked)
          .map((i) => i.id);
        const categories = Array.from(form["categories"])
          .filter((i) => i.checked)
          .map((i) => i.id);
        const skills = Array.from(form["skills"])
          .filter((i) => i.checked)
          .map((i) => i.id);
        const accountNumber = form["account number"].value;
        const ifscCode = form["IFSC code"].value;

        let uploadId = undefined;
        if (form["profilePicture"].files.length === 1) {
          const file = form["profilePicture"].files[0];
          const uploadBody = new FormData();
          uploadBody.append("upload", file);

          const res = await uploadImage(uploadBody);
          if (res.error) throw new Error("message");
          uploadId = res.data.id;
        }

        const res = await postProfile({
          name,
          phone,
          dob,
          description,
          videoCallPrice, audioCallPrice,
          chatPrice,
          experience,
          languages,
          categories,
          skills,
          accountNumber,
          ifscCode,
          uploadId,
        });
        if (res.data) astroRes.refetch()
      } else {
        form.classList.add("was-validated");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (astroRes.isLoading) return <PageLoading />;
  if (astroRes.isError) return <ApiErrorModal res={astroRes} />;

  if (uploadImageRes.isLoading) return <PageLoading />;
  if (uploadImageRes.isError) return <ApiErrorModal res={uploadImageRes} />;

  const astro = astroRes.data;

  const disabled = astro.status !== "Created";

  return (


    <Page>
      <form onSubmit={onSubmit} noValidate>
        <ApiErrorModal res={postProfileRes} />
        {postProfileRes.isSuccess && (
          <SuccessModal message={"Profiling has been done"} />
        )}
        {uploadImageRes.isError && <ApiErrorModal res={uploadImageRes} />}


        <div className="row mb-3">
          {/* <div className="col d-flex justify-content-center  ">
            <ProfilePicture
              size={100}
              name={astro.name || astro.phone}
              picture={astro?.astroPicture?.src}
            />
          </div> */}

          <div className="col d-flex justify-content-center">
            <ProfilePictureInput
              name="profilePicture"
              defaultValue={astro?.astroPicture?.src}
              disabled={disabled}
            />
          </div>
        </div>

        <div className="row row-cols-1 row-cols-lg-2 g-3 mb-4">
          <Input
            name="name"
            defaultValue={astro.name}
            required
            disabled={disabled}
          />

          <Input
            name="email"
            type="email"
            defaultValue={astro.email}
            required
            disabled={disabled || astro.email}
          />
          {/* <Input
            name="phone number"
            type="text"
            defaultValue={astro.phone}
            required
            disabled={disabled || astro.phone}
          /> */}
          <PhoneNumberInput name={"phone"} disabled={disabled || astro.phone} defaultValue={astro.phone} />

          <Input
            name="date of birth"
            type="date"
            defaultValue={astro.dob}
            required
            disabled={disabled}
          />
          <Input
            name="description"
            type="textarea"
            defaultValue={astro.description}
            rows="3"
            required
            disabled={disabled}
          />
          <Input name="video Call Price" type="number" defaultValue={astro.videoCallPrice} prefix="₹" required disabled={disabled} />
          <Input name="audio Call Price" type="number" defaultValue={astro.audioCallPrice} prefix="₹" required disabled={disabled} />
          <Input
            name="chat price"
            type="number"
            defaultValue={astro.chatPrice}
            prefix="₹"
            required
            disabled={disabled}
          />
          <Input
            name="experience(in years)"
            type="number"
            defaultValue={astro.experience}
            required
            disabled={disabled}
          />
          <Input
            name="account number"
            type="number"
            defaultValue={astro.accountNumber}
            required
            disabled={disabled}
          />
          <Input
            name="IFSC code"
            type="number"
            defaultValue={astro.ifscCode}
            required
            disabled={disabled}
          />
        </div>

        <CheckboxGroup
          name="languages"
          disabled={disabled}
          options={LANGUAGES}
          rowClassName={"row-cols-lg-5 row-cols-3 g-3 mb-3"}
          defaultValues={astro.languages}
        />
        <CheckboxGroup
          name="categories"
          disabled={disabled}
          options={CATEGORIES}
          defaultValues={astro.categories}
          rowClassName={"row-cols-lg-5 row-cols-3 g-3 mb-3"}
        />
        <CheckboxGroup
          name="skills"
          disabled={disabled}
          options={SKILLS}
          defaultValues={astro.skills}
          rowClassName={"row-cols-lg-5 row-cols-3 g-3 mb-3"}
        />

        {disabled || (
          <div className="row row-cols-3 justify-content-center">
            <Button res={postProfileRes} disabled={disabled}>
              Submit
            </Button>
          </div>
        )}
      </form>
    </Page >
  );
};

export default Profile;
