namespace PlanningPokerAPI.Interfaces
{
    public interface IEmailSenderRepository
    {
        Task SendEmail(string email, string link);
    }
}
