function Navbar({ scrollToSection, refs }) {
    return (
      <nav className="navbar">
        <button onClick={() => scrollToSection(refs.homeRef)}>Home</button>
        <button onClick={() => scrollToSection(refs.campaignsRef)}>Campaigns</button>
        <button onClick={() => scrollToSection(refs.createRef)}>Create</button>
        <button onClick={() => scrollToSection(refs.aboutRef)}>About</button>
        <button onClick={() => scrollToSection(refs.contactRef)}>Contact</button>
        <button onClick={() => scrollToSection(refs.blogRef)}>Blog</button>
      </nav>
    );
  }
  
  export default Navbar;
  
