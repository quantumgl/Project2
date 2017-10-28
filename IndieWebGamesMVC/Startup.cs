using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(IndieWebGamesMVC.Startup))]
namespace IndieWebGamesMVC
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
