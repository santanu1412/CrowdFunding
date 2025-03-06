function CreateCampaign() {
  return (
    <div className="create-campaign">
      <h2>Create a Campaign</h2>
      <form>
        <input type="text" placeholder="Campaign Title" />
        <input type="number" placeholder="Goal Amount" />
        <input type="text" placeholder="Description" />
        <input type="url" placeholder="Image URL (ADD_YOUR_IMAGE_URL_HERE)" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateCampaign;