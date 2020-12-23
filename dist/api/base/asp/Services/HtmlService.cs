using System;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Hosting;

namespace Services
{
    public class HtmlService
    {
        private readonly IWebHostEnvironment _env;
        public HtmlService(/*IWebHostEnvironment env*/)
        {
            // this.emailService = emailService;
            // _env = env;
        }
        // public async Task<string> GenerateHtml( )
        // {
        //     var filename = "registration_pro.html";
        //     returnUrl = returnUrl.Replace("%2F", "/");
        //     var strHTML = await System.IO.File.ReadAllTextAsync($"db/{filename}");

        //     return codeBasic;
        // }

        public async Task<string> GenerateHtmlVacancier(string action_url, string email, string support_email, string psudo, string lang)
        {
            var filename = "registration_user.html";
            var strHTML = await System.IO.File.ReadAllTextAsync($"db/{filename}");
            strHTML = strHTML.Replace("{{action_url}}", action_url);
            strHTML = strHTML.Replace("{{email}}", email);
            strHTML = strHTML.Replace("{{support_email}}", support_email);
            strHTML = strHTML.Replace("{{psudo}}", psudo);

            return strHTML;
        }

        public async Task<string> GenerateHtmlPro(string action_url, string email, string support_email, string name, string place_name, string lang)
        {
            var filename = "registration_pro.html";
            var strHTML = await System.IO.File.ReadAllTextAsync($"db/{filename}");
            strHTML = strHTML.Replace("{{action_url}}", action_url);
            strHTML = strHTML.Replace("{{email}}", email);
            strHTML = strHTML.Replace("{{support_email}}", support_email);
            strHTML = strHTML.Replace("{{name}}", name);
            strHTML = strHTML.Replace("{{place_name}}", place_name);

            return strHTML;
        }

        public async Task<string> GenerateHtmlReset(string action_url, string support_email, string name, string lang)
        {
            var filename = "reset_password.html";
            var strHTML = await System.IO.File.ReadAllTextAsync($"db/{filename}");
            strHTML = strHTML.Replace("{{action_url}}", action_url);
            strHTML = strHTML.Replace("{{support_email}}", support_email);
            strHTML = strHTML.Replace("{{name}}", name);

            return strHTML;
        }

        public async Task<string> GenerateHtmlMessage(string action_url, string support_email
            , string name, string message, int year, string lang)
        {
            var filename = "message.html";
            var strHTML = await System.IO.File.ReadAllTextAsync($"db/{filename}");
            strHTML = strHTML.Replace("{{action_url}}", action_url);
            strHTML = strHTML.Replace("{{support_email}}", support_email);
            // strHTML = strHTML.Replace("{{name}}", name);
            strHTML = strHTML.Replace("{{message}}", message);
            strHTML = strHTML.Replace("{{year}}", $"{year}");

            return strHTML;
        }

        public async Task<string> GenerateHtmlActivePlace(string action_url, string email
        , string support_email, string name, string username, string place_name, string lang)
        {
            var filename = "activate_place.html";
            var strHTML = await System.IO.File.ReadAllTextAsync($"db/{filename}");
            strHTML = strHTML.Replace("{{action_url}}", action_url);
            strHTML = strHTML.Replace("{{email}}", email);
            strHTML = strHTML.Replace("{{support_email}}", support_email);
            strHTML = strHTML.Replace("{{name}}", name);
            strHTML = strHTML.Replace("{{username}}", username);
            strHTML = strHTML.Replace("{{place_name}}", place_name);

            return strHTML;
        }


        public async Task<string> GenerateHtmlActiveAnimOrTour(string action_url, string support_email
        , string name, string username, string password,string place_name, string lang)
        {
            var filename = "login_info.html";
            var strHTML = await System.IO.File.ReadAllTextAsync($"db/{filename}");
            strHTML = strHTML.Replace("{{action_url}}", action_url);
            strHTML = strHTML.Replace("{{support_email}}", support_email);
            strHTML = strHTML.Replace("{{name}}", name);
            strHTML = strHTML.Replace("{{username}}", username);
            strHTML = strHTML.Replace("{{password}}", password);
            strHTML = strHTML.Replace("{{place_name}}", place_name);

            return strHTML;
        }




    }
}